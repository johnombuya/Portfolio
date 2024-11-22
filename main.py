#!/usr/bin/python3
"""
Flask application for managing a portfolio website.

This application serves routes for rendering different pages of the portfolio website,
including the home, resume, and a route for downloading the resume file.
"""

from flask import Flask, render_template, send_file
from flask_assets import Bundle, Environment
from flask_compress import Compress
from helpers.helpers import fetch_file_names
from databases.portfolioManager import Projects, Certificates

# Initialize the Flask app
app = Flask(__name__)
Compress(app)
app.config["SECRET_KEY"] = "8BYkEfBA6O6donzWlSihBXox7C0sKR6b"

# Minify and bundle JavaScript and CSS files
js = Bundle("js/script.js", output="gen/main.js", filters="jsmin")
css = Bundle("css/styles.css", output="gen/styles.css", filters="cssmin")

# Set up Flask-Assets environment
assets = Environment(app)
assets.register("main_js", js)
assets.register("main_css", css)

@app.route("/")
def home():
    """
    Render the home page.

    Displays the portfolio's project and certificate information.
    """
    projects = Projects.select()
    certificates = Certificates.select()
    return render_template("index.html", projects=projects, certificates=certificates)

@app.route("/resume")
def resume():
    """
    Render the resume page.

    Displays details about professional experience and education.
    """
    return render_template("resume.html")

@app.route("/resume/download")
def download_file():
    """
    Serve the resume file for download.

    Returns:
        FileResponse: PDF file of the resume downloaded as an attachment.
    """
    path = "static/docs/johnombuya-resume.pdf"  # Path to the resume file
    filename = "John Ombuya Resume.pdf"         # Name for the downloaded file
    return send_file(path, as_attachment=True, download_name=filename)

if __name__ == "__main__":
    app.run()
    # app.run(debug=True)
