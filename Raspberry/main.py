import requests
import time
from datetime import datetime

backend_url = "http://localhost:5000"
USER_ID = '1'
exercise_id = None

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
    duration = len(sensor_data_list)  # Assuming 5 seconds interval between sensor readings #CHECK
    calories_burnt = sum([data['heart_rate'] for data in sensor_data_list]) / 100               #CHECK
    speed = sum([data['infrared_data'] for data in sensor_data_list]) / len(sensor_data_list)   #CHECK
    top_speed = max([speed for data in sensor_data_list])
    top_heart_rate = max([data['heart_rate'] for data in sensor_data_list]) 
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
        "topSpeed": top_speed,
        "topHeartRate": top_heart_rate,
        "distance": distance,
        "date": date,
    }

    return exercise_data

def get_mock_sensor_data():
    # Replace this function with actual sensor reading code
    import random

    heart_rate = random.randint(60, 100)
    infrared_data = random.randint(0, 1)

    return heart_rate, infrared_data

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
        exercise_started = get_exercise_status()

        if exercise_started is None:
            print("Error checking exercise status")
        elif exercise_started:
            heart_rate, infrared_data = get_mock_sensor_data()
            print(f"Sensing sensor data: Heart rate={heart_rate}, Infrared data={infrared_data}")

            sensor_data = {"heart_rate": heart_rate, "infrared_data": infrared_data}
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

        time.sleep(1)