from youtubesearchpython import VideosSearch
from pytube import YouTube
import re
import requests
import os
import google.generativeai as genai


google_search_key="AIzaSyC-aPBlh5wU_bm4E5F10S5dZhCal6b0huE"
google_key = "AIzaSyADVEdIvZ4AihOaUMYhXmLY-bNN6VWReeo"
 
api_key = google_search_key
cx = "5527c7d0ec5664d0e"
genai.configure(api_key=google_key)
def extract_song_info(text_list):
    cleaned_list = []
    
    for song in text_list:
        cleaned_song = re.sub(r'[^A-Za-z\s]', '', song)
        cleaned_list.append(cleaned_song)
    
    return cleaned_list
def get_song_image(query, api_key, cx):
    base_url = "https://www.googleapis.com/customsearch/v1"
    
    params = {
        'q': query,
        'key': api_key,
        'cx': cx,
        'searchType': 'image'
    }
    
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        data = response.json()
        
        if 'items' in data:
            return data['items'][2]['link']  
        else:
            return None
    except requests.exceptions.RequestException as e:
        print(f"Error: {e}")
        return None
def search_and_get_song_info(song_name):
    videos_search = VideosSearch(song_name, limit=1)
    results = videos_search.result()

    if not results["result"]:
        print("Song not found.")
        return None, None, None, None, None

    video_url = results["result"][0]["link"]
    preview_url = f"https://www.youtube.com/watch?v={results['result'][0]['id']}"
    thumbnail_url = results['result'][0]['thumbnails'][0]['url']

    yt = YouTube(video_url)
    audio_stream = yt.streams.filter(only_audio=True).first()
    audio_url = audio_stream.url
    artist_name = results['result'][0]['channel']['name']
    image_url = get_song_image(song_name + " song art", api_key, cx)

    duration = yt.length  # Duration in seconds

    return audio_url, preview_url, image_url, artist_name, song_name, duration
def create_5_songs(mood,genre,temp,contex):
    prompt = f"""
    Provide a list of 5 songs based on the following criteria:
    - Mood: {mood}
    - Genre: {genre}
    - Tempo: {temp}
    - Context: {contex}

    Please return the results as a line-separated list.
    eg. "song1 - artist1",
    song2 - artist2,
    song3 - artist3,
    song4 - artist4,
    song5 - artist5",
    
"""

    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
 
    songs = extract_song_info(response.text.split('\n'))

    results = []
    for song in songs:
        audio_url, preview_url, thumbnail_url, artist_name,song_name,duration = search_and_get_song_info(song)
        results.append({
            "title": song,
            "artist":artist_name,
            "audio_url": audio_url,
            "preview_url": preview_url,
            "thumbnail_url": thumbnail_url,
            "song_name":song_name,
            "duration":duration
    
        })
    return results


def create_15_songs(mood,genre,temp,context,songs:list,count):
    songx  ="".join([f"{song}, " for song in songs])

    prompt = f"""
    Provide a list of {count} songs based on the following criteria:
    - Mood: {mood}
    - Genre: {genre}
    - Tempo: {temp}
    - Context: {context}
    - Current songs: {songx}, generate more songs like this

    Please return the results as a line-separated list.
    eg. "song1 - artist1",
    song2 - artist2,
    song3 - artist3,
    song4 - artist4,
    song5 - artist5",
    ....
    song{count-1} - artist4,
    song{count}- artist5",
"""
    print(prompt)
    model = genai.GenerativeModel('gemini-pro')
    response = model.generate_content(prompt)
    songs = extract_song_info(response.text.split('\n'))
    print(songs)
    results = []
    for song in songs:
        audio_url, preview_url, thumbnail_url, artist_name,song_name,duration = search_and_get_song_info(song)
        results.append({
            "title": song,
            "artist":artist_name,
            "audio_url": audio_url,
            "preview_url": preview_url,
            "thumbnail_url": thumbnail_url,
            "song_name":song_name,
            "duration":duration
    
        })
    return results