import re

from flask import Flask, request, render_template
from ytmusicapi import YTMusic
from pytube import YouTube

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/search', methods=['POST'])
def search():
    query = request.form['query']
    ytmusic = YTMusic()
    search_results = ytmusic.search(query, filter="songs", limit=5)  # Получаем первые 5 результатов
    return render_template('results.html', results=search_results)


def clean_filename(filename):
    # Remove special characters and spaces from the filename
    return re.sub(r'[^\w\s-]', '', filename).strip().replace(' ', '_')


@app.route('/download', methods=['POST'])
def download():
    try:
        video_id = request.form['video_id']
        file_name = clean_filename(request.form['title'])

        yt = YouTube(f'https://www.youtube.com/watch?v={video_id}')
        stream = yt.streams.filter(only_audio=True, file_extension='mp4').first()

        if stream:
            # Download the audio stream
            stream.download(output_path='static/music', filename=f"{file_name}.mp3")
            return render_template('download.html', file_name=file_name)
        else:
            return "Failed to download audio"
    except Exception as e:
        return f"Error: {str(e)}"

if __name__ == '__main__':
    app.run(debug=True)