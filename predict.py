import json
import os
import subprocess
# from ultralytics import YOLO
import sys
import cv2

def run_yolov9_detection( ):
    if not os.path.exists("results"):
        os.makedirs("results")

    command = [
        'python', 'yolov9/detect.py',
        '--source', "frames",
        '--output', "results",
        '--weights', "best.pt",
        '--conf', str(0.3)
    ]
    
    subprocess.run(command)

def main(video_path):
    # model = YOLO("best.pt")

    names = [
        "A", "B", "C", "CH", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V",
        "W", "X", "Y", "Z", "additional", "alcohol", "allergy", "bacon", "bag", "barbecue", "bill", "biscuit", "bitter",
        "bread", "burger", "bye", "cake", "cash", "cheese", "chicken", "coke", "cold", "cost", "coupon", "credit card",
        "cup", "dessert", "drink", "drive", "eat", "eggs", "enjoy", "fork", "french fries", "fresh", "hello", "hot",
        "icecream", "ingredients", "juicy", "ketchup", "lactose", "lettuce", "lid", "manager", "menu", "milk", "mustard",
        "napkin", "no", "order", "pepper", "pickle", "pizza", "please", "ready", "receipt", "refill", "repeat", "safe",
        "salt", "sandwich", "sauce", "small", "soda", "sorry", "spicy", "spoon", "straw", "sugar", "sweet", "thank-you",
        "tissues", "tomato", "total", "urgent", "vegetables", "wait", "warm", "water", "what", "yoghurt", "your"
    ]

    index = []

    cap = cv2.VideoCapture(video_path)
    if not cap.isOpened():
        print(f"Error: Could not open video {video_path}")
        return
    frame_number=0
    while True:
        check, frame = cap.read()
        if not check:
            break
        if not os.path.exists("output"):
            os.makedirs("output")
        frame_path = os.path.join("output", f'frame_{frame_number}.jpg')
        cv2.imwrite(frame_path, frame)
        frame_number += 1
        
    cap.release()
    
    print(index)

def parse_detection_results(result):
    class_names = []
    for result_file in os.listdir("results"):
        if result_file.endswith('.json'): 
            result_path = os.path.join("results", result_file)
            with open(result_path, 'r') as f:
                data = json.load(f)
                for detection in data:
                    class_name = detection['class']  
                    class_names.append(class_name)
    
    return class_names



if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python predict.py <video_path>")
    else:
        main(sys.argv[1])
        run_yolov9_detection()
        detected_classes = parse_detection_results("results")
        print(detected_classes)
