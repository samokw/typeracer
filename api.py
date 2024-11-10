from flask import Flask, jsonify, request
from flask_cors import CORS
import csv
from random import randrange
import speech_recognition as sr
import pyttsx3
import threading

app = Flask(__name__)
CORS(app)

# Load quotes from CSV
def load_quotes():
    phrases = []
    with open('data.csv', 'r') as file:
        csvFile = csv.reader(file)
        for lines in csvFile:
            l = lines[0:(len(lines)-1)]
            phrases.append(l)
    return phrases

# Fetch a random quote
@app.route('/quote', methods=['GET'])
def get_random_quote():
    phrases = load_quotes()
    if phrases:
        randNum = randrange(0, len(phrases))
        quote = phrases[randNum]
        return jsonify({'quote': quote[0]})
    else:
        return jsonify({'error': 'No quotes available'}), 404

# Initialize recognizer
recognizer = sr.Recognizer()

# Audio recording and recognition function
def record_audio(duration=5):
    try:
        with sr.Microphone() as source:
            recognizer.adjust_for_ambient_noise(source, duration=0.2)
            print("Recording started...")
            # Set phrase_time_limit to stop recording after `duration` seconds
            audio = recognizer.listen(source, timeout=5, phrase_time_limit=duration)
            print("Recording stopped.")

            # Recognize the audio
            text = recognizer.recognize_google(audio)
            print(f"Recognized text: {text}")
            return text

    except sr.RequestError as e:
        print(f"Could not request results; {e}")
        return "Error: Could not request results"
    except sr.UnknownValueError:
        return "Error: Could not understand audio"

@app.route('/record', methods=['GET'])
def start_recording():
    duration = int(request.args.get('duration', 5))  # Default duration is 5 seconds
    text = record_audio(duration)
    print(text)
    return jsonify({'text': text})

# Start the Flask app
if __name__ == '__main__':
    app.run(debug=True)
