#include <LiquidCrystal.h>    

LiquidCrystal lcd(12,11, 6, 5, 4, 3); 
const byte IR_SENSOR_PIN = 2;    
const byte INTERRUPT_PIN = 0;    

int BPM = 54;
int rpm = 0;
int revCountBuffer[10] = {0};
int totalCount=0;
int bufferIndex = 0;
int revCount = 0;
long previousMillis = 0;
volatile unsigned long lastTriggerMillis = 0; // last time the sensor was triggered
const unsigned long debounceTime = 200;  // debounce time in ms

void setup() {
    Serial.begin(9600);
    lcd.begin(16,2);
    pinMode(IR_SENSOR_PIN, INPUT);
    attachInterrupt(INTERRUPT_PIN, revCountFunc, FALLING);
}

void loop() { 
    long currentMillis = millis();
    if(currentMillis - previousMillis >= 1000) {   
        previousMillis = currentMillis;
        noInterrupts();
        revCountBuffer[bufferIndex] = revCount;  
        revCount = 0;                           
        bufferIndex = (bufferIndex + 1) % 10;   

        int sum = 0;
        for (int i = 0; i < 10; i++) {
            sum += revCountBuffer[i];
        }
        rpm = sum * 6.0;  
        interrupts();

        lcd.setCursor(0,0);
        lcd.print(rpm);
        lcd.setCursor(0,1);
        lcd.print(totalCount);        
    }
    Serial.println(String(rpm)+","+String(BPM));
    delay(500);
}

void revCountFunc() {
    unsigned long currentMillis = millis();
    if (currentMillis - lastTriggerMillis >= debounceTime) {  // if enough time has passed since last trigger
        revCount++;
        totalCount++;
        lastTriggerMillis = currentMillis;  // remember when this trigger occurred
    }
}
