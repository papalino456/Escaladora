import requests
import serial
import time
from datetime import datetime
import threading
from collections import deque

ser = serial.Serial("COM4", 9600)
backend_url = "https://escaladora-tec.herokuapp.com"
USER_ID = '1'
exercise_id = None
buffer = []
heart_rate = 0
speed = 0
exercise_started = None
exercise_status_lock = threading.Lock()
calculate_and_send_data_thread_running = False
start_time = None  # Start time of the exercise

def fetch_exercise_status():
    global exercise_started
    while True:
        status = get_exercise_status()
        with exercise_status_lock:
            exercise_started = status
        if not exercise_started:
            print("Exercise not started yet")
        time.sleep(5)  # Fetch status every 5 seconds


def send_exercise_data(exercise_data):
    global exercise_id
    if exercise_id is None:
        response = requests.post(f"{backend_url}/api/sensorData", json=exercise_data)

        if response.status_code == 200:
            exercise_id = response.text
            print("Exercise data sent successfully, received exercise ID:", exercise_id)
        else:
            print(f"Error sending exercise data: {response.status_code}")

    else:
        exercise_data["exerciseID"] = exercise_id
        response = requests.put(f"{backend_url}/api/sensorData/{exercise_id}", json=exercise_data)
        
        if response.status_code == 200:
            print("Exercise data updated successfully")
        else:
            print(f"Error updating exercise data: {response.status_code}")


def calculate_and_send_data(sensor_data_list):
    global calculate_and_send_data_thread_running
    exercise_data = calculate_exercise_data(list(sensor_data_list))
    if exercise_id:
        exercise_data["exerciseID"] = exercise_id
    send_exercise_data(exercise_data)
    time.sleep(0.5)
    calculate_and_send_data_thread_running = False  # Done calculating and sending

def calculate_and_send_data_thread(sensor_data_list):
    global calculate_and_send_data_thread_running
    if not calculate_and_send_data_thread_running:  # Only start if not already running
        calculate_and_send_data_thread_running = True
        thread = threading.Thread(target=calculate_and_send_data, args=(sensor_data_list,))
        thread.start()

def calculate_exercise_data(sensor_data_list):
    global start_time
    current_time = time.time()
    duration = int(round((current_time - start_time) if start_time else 0, 1))
    calories_burnt = int(duration/60 * ((0.6309*sum([data['heart_rate'] for data in sensor_data_list])/len(sensor_data_list)) + 0.1988*80 + 0.2017*25 - 55.0969)/4.184)               
    top_speed = max([data['speed'] for data in sensor_data_list])
    top_heart_rate = max([data['heart_rate'] for data in sensor_data_list])
    heart_rate_list = [data['heart_rate'] for data in sensor_data_list]
    date = datetime.now().isoformat()
    global exercise_id
    if not exercise_id:
        exercise_id = f"exerciseID_{time.time()}"

    exercise_data = {
        "exerciseID": exercise_id,
        "userID": USER_ID,
        "duration": duration,
        "caloriesBurnt": calories_burnt,
        "speed": speed,
        "topSpeed": top_speed,
        "topHeartRate": top_heart_rate,
        "heartRateList": heart_rate_list,
        "distance": distance,
        "date": date,
    }

    return exercise_data

def get_mock_sensor_data(byte_stream):
    str_data = "".join(byte_stream)
    str_data = str_data.replace("\n", "").replace("\r", "")
    str_data = str_data.split(",")
    try:
        first_num = int(str_data[0]) if str_data[0] != '' else None
        second_num = int(str_data[1]) if str_data[1] != '' else None
        third_num = int(str_data[2]) if str_data[2] != '' else None
        print(f"Speed = {first_num}")
        print(f"Heart Rate = {second_num}")
        print(f"Distance = {third_num}")
        return first_num, second_num, third_num
    except IndexError:
        print("Invalid data received: Not enough values to unpack")
        return 0,0,0

def get_exercise_status():
    response = requests.get(f"{backend_url}/api/exerciseStatus")

    if response.status_code == 200:
        status_data = response.json()
        return status_data["started"]
    else:
        print(f"Error getting exercise status: {response.status_code}")
        return None

if __name__ == "__main__":
    sensor_data_list = deque(maxlen=15)
    status_thread = threading.Thread(target=fetch_exercise_status)
    status_thread.start()
    sensor_data_list.clear()

    while True:
        byte = ser.read()
        byte_decoded = byte.decode("utf-8")
        print(byte_decoded)

        with exercise_status_lock:
            current_exercise_started = exercise_started
            
        if current_exercise_started is None:
            print("Error checking exercise status")
        elif current_exercise_started:
            if start_time is None:  # If an exercise has just started
                start_time = time.time()  # Update start time
            if byte_decoded != '\n':
                buffer.append(byte_decoded)
            else:
                speed, heart_rate, distance = get_mock_sensor_data(buffer)
                buffer = []
                
            sensor_data = {"heart_rate": heart_rate, "speed": speed, "distance": distance}
            sensor_data_list.append(sensor_data)
            
            calculate_and_send_data_thread(sensor_data_list)
        else:
            sensor_data_list.clear()
            exercise_id = None
            start_time = None  # Reset start time when there's no exercise