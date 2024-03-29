# Escaladora
### Sensors
- Heart rate sensor
- Speed sensor (infrared reflective)

### Planned conectivity functions
- **Bluetooth + WiFi**
- **IoT stat tracking**
- **Machine ID auth + name change**
- **Gamification**
    - Competitive scores/ranks
    - Communities/friends
    - Achievements
    - Unlockable personalization/avatars
- QR code for data/image generation and sharing
- Smart devices connectivity (wrist bands and the likes)
- Registering data to common health apps such as google fit

The machine has an LCD display, allowing for touch control for wifi/bluetooth setup
We plan to achieve user auth via machine ID, thus circunventing the hassle of signing up and setting a password etc...


### Electronics
- Raspberry Pi 3/4 or **Raspberry Pi Zero W/Zero W 2** 
    - ?? Search for cheaper alternative capable of the following:
    - Wifi and bluetooth
    - Capable of running **Python** or NodeJS
    - Compatible with LCD screen
    - Enough IO pins to connect sensors
    - Alternatively can use a non connected microprocessor and a wifi/bluetooth module
- Heart rate sensor
- Infrared reflective sensor
- Resistance control ??

### System Framework
- Server to host a React page and data management backend with nodeJS & Express
- Python client in the machine to send data through http requests and show webpage in borderless "browser"
- Webpage page may be accessed through other devices or app
- MERN/FERN Stack + http data logging