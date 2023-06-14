#include <PeakDetection.h>
#include "Filter.h"

//  Variables
int PulseSensorPurplePin = 0;  // Pulse Sensor
int LED = LED_BUILTIN;  
int Signal;

unsigned long lastSecond = millis();
int peakCounts[60] = {0};  // Array to store peak counts for the last 60 seconds
int peakCount = 0;  // Current second's peak count
int secondIndex = 0;  // Index to keep track of where in the 60 second cycle we are
int totalPeakCount = 0;  // Sum of the last 60 seconds' peak counts

int IRpin = 2;
int IR;
int IRcounts[60] = {0};
int IRcount = 0;
int totalIRCount = 0;



ExponentialFilter<float> FilteredSignal(20,0);

PeakDetection peakDetection;
int prevPeak = 0;
int prevIR = 0;

// The SetUp Function:
void setup() {
  pinMode(LED,OUTPUT);         // pin that will blink to your heartbeat!
  pinMode(IRpin,INPUT);
  Serial.begin(9600);         // Set's up Serial Communication at certain speed.
  peakDetection.begin(30, 1.99, 0.8);
}

// The Main Loop Function
void loop() {

  float Signal = analogRead(PulseSensorPurplePin);  // Read the PulseSensor's value.
  FilteredSignal.Filter(Signal);
  float SmoothSignal = FilteredSignal.Current();
  long mapped = map(SmoothSignal,300.0,800.0,0.0,10.0);
  long amplified = SmoothSignal*100 - 35000;
  peakDetection.add(amplified);
  int peak = (peakDetection.getPeak()*10000);

  IR = 1 - digitalRead(IRpin);

//--------------PRINT RAW DATA/FILTERS------------------

/*
  Serial.print("smooth:");
  Serial.print(SmoothSignal);
  Serial.print(",threshold:");
  Serial.print(300);
  Serial.print(",peak:");
  Serial.print(peak);
  Serial.print(",ampified:");
  Serial.println(amplified);
*/
/*
  Serial.print("peak:");
  Serial.print(peak/10000);
  Serial.print(",IR:");
  Serial.println(IR);
*/
  if (peak == 10000 && prevPeak != 10000) {
    peakCount++;
    digitalWrite(LED,HIGH);
  }
  else{
    digitalWrite(LED,LOW);  
  }
  prevPeak = peak;

  if (IR == 1 && prevIR != 1) {
    IRcount++;
  }
  prevIR = IR;

  if (millis() - lastSecond >= 1000) {
    totalPeakCount -= peakCounts[secondIndex];  // Subtract the count from a minute ago
    totalPeakCount += peakCount;  // Add the count from this second
    peakCounts[secondIndex] = peakCount;  // Update the count for this second

    totalIRCount -= IRcounts[secondIndex];
    totalIRCount += IRcount;
    IRcounts[secondIndex] = IRcount;

//---------PRINT PROCESSED DATA-----------
/*
    Serial.print("Beats per minute: ");
    Serial.print(totalPeakCount);
    Serial.print(",RPM: ");
    Serial.println(totalIRCount);
*/

    peakCount = 0;  // Reset the count for the next second
    IRcount = 0;

    lastSecond = millis();
    secondIndex = (secondIndex + 1) % 60;  // Move the index forward, wrapping around if necessary

    Serial.println(String(totalIRCount)+","+String(totalPeakCount)); //send to serial port
    
  }

delay(10);

}
