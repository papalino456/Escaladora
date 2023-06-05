import requests
import serial
import time
from datetime import datetime

ser = serial.Serial("COM7", 9600)
backend_url = "https://escaladora-tec.herokuapp.com"
USER_ID = '1'
exercise_id = None
buffer = []
heart_rate = 0
speed = 0

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

def calculate_exercise_data(sensor_data_list):
    # Replace this function with actual calculations based on the sensor data
    duration = round(len(sensor_data_list) * 0.5, 1)  # Assuming 0.5 seconds interval between sensor readings #CHECK
    calories_burnt = sum([data['heart_rate'] for data in sensor_data_list]) / 100               #CHECK
    top_speed = max([data['speed'] for data in sensor_data_list])
    top_heart_rate = max([data['heart_rate'] for data in sensor_data_list])
    heart_rate_list = [data['heart_rate'] for data in sensor_data_list]
    distance = speed * duration
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
    # Convert list to string
    str_data = "".join(byte_stream)
    # Remove \n and \r
    str_data = str_data.replace("\n", "").replace("\r", "")
    # Split string into two numbers
    str_data = str_data.split(",")
    # Convert strings to floats
    first_num = float(str_data[0])
    second_num = float(str_data[1])
    return first_num, second_num

def get_exercise_status():
    response = requests.get(f"{backend_url}/api/exerciseStatus")

    if response.status_code == 200:
        status_data = response.json()
        return status_data["started"]
    else:
        print(f"Error getting exercise status: {response.status_code}")
        return None



if __name__ == "__main__":
    sensor_data_list = []

    while True:
        byte = ser.read()
        byte_decoded = byte.decode("utf-8")
        exercise_started = get_exercise_status()
        
        if exercise_started is None:
            print("Error checking exercise status")
        elif exercise_started:
            if byte != b'\n':
                buffer.append(byte_decoded)
            else:
                speed, heart_rate = get_mock_sensor_data(buffer)
                buffer = []
                print(f"Speed = {speed}")
                print(f"Heart Rate = {heart_rate}")
            print(f"Sensing sensor data: Heart rate={heart_rate}, Speed={speed}")
            sensor_data = {"heart_rate": heart_rate, "speed": speed}
            sensor_data_list.append(sensor_data)

            exercise_data = calculate_exercise_data(sensor_data_list)
            if exercise_id:
                exercise_data["exerciseID"] = exercise_id
            print(f"Sending exercise data: {exercise_data}")

            response_data = send_exercise_data(exercise_data)

            if response_data:
                print(f"Received response: {response_data}")
        else:
            sensor_data_list = []
            exercise_id = None
            print("Exercise not started yet")