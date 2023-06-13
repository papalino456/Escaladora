#include <PeakDetection.h>
#include "Filter.h"

//  Variables
int PulseSensorPurplePin = 0;        // Pulse Sensor PURPLE WIRE connected to ANALOG PIN 0
int LED = LED_BUILTIN;   //  The on-board Arduion LED
int Signal;                // holds the incoming raw data. Signal value can range from 0-1024
int Threshold = 580;       // Determine which Signal to "count as a beat", and which to ingore.

ExponentialFilter<float> FilteredSignal(20,0);

PeakDetection peakDetection;

// The SetUp Function:
void setup() {
  pinMode(LED,OUTPUT);         // pin that will blink to your heartbeat!
   Serial.begin(9600);         // Set's up Serial Communication at certain speed.
  peakDetection.begin(30, 1.96, 0.5);
}

// The Main Loop Function
void loop() {

  float Signal = analogRead(PulseSensorPurplePin);  // Read the PulseSensor's value.
                                              // Assign this value to the "Signal" variable.

                       // Send the Signal value to Serial Plotter.
   FilteredSignal.Filter(Signal);
   float SmoothSignal = FilteredSignal.Current();
   long mapped = map(SmoothSignal,300.0,800.0,0.0,10.0);
   long amplified = SmoothSignal*100 - 35000;
   peakDetection.add(amplified);
   int peak = (peakDetection.getPeak()*10000);

     Serial.print("smooth:");
    Serial.print(SmoothSignal);
    Serial.print(",threshold:");
    Serial.print(300);
    Serial.print(",peak:");
    Serial.print(peak);
    Serial.print(",ampified:");
    Serial.println(amplified);

   if(Signal > Threshold){                          // If the signal is above "550", then "turn-on" Arduino's on-Board LED.
     digitalWrite(LED,HIGH);
   } else {
     digitalWrite(LED,LOW);                //  Else, the sigal must be below "550", so "turn-off" this LED.
   }


delay(10);


}
