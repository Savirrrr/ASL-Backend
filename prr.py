# python
import subprocess
import cv2
import os

def run_yolov9_detection(frames_folder, results_folder, weights_path, conf_threshold):
    if not os.path.exists(results_folder):
        os.makedirs(results_folder)

    command = [
        'python', 'detect.py',
        '--source', frames_folder,
        '--output', results_folder,
        '--weights', weights_path,
        '--conf', str(conf_threshold)
    ]
    
    subprocess.run(command)

def save_frames(video_path, output_folder):
    if not os.path.exists(output_folder):
        os.makedirs(output_folder)

    cap = cv2.VideoCapture(video_path)
    frame_number = 0

    while True:
        ret, frame = cap.read()
        if not ret:
            break
        frame_path = os.path.join(output_folder, f'frame_{frame_number}.jpg')
        cv2.imwrite(frame_path, frame)
        frame_number += 1

    cap.release()

# Call the function
save_frames('input_video.mp4', 'frames')