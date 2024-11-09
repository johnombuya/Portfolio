#!/usr/bin/python3
"""
Flask application for managing a portfolio website.

This application serves routes for rendering different pages of the portfolio website,
including the home, about, and contact pages, as well as a route for downloading the resume file.
"""

from flask import Flask, render_template, send_file
from flask_bootstrap import Bootstrap
from helpers.helpers import fetch_file_names
from portfolioManager import *

app = Flask(__name__)
app.config["SECRET_KEY"] = "8BYkEfBA6O6donzWlSihBXox7C0sKR6b"
Bootstrap(app)

@app.route("/")
def home():
    """Render the home page displaying project information."""
    # Fetch Certificate Paths in Certificates Dir
    certificates_dir_rel_path = "/static/assets/certificates"
    certificates_dir_path = f"{os.path.dirname(os.path.abspath(__file__))}{certificates_dir_rel_path}"
    certificate_paths = [f"{certificates_dir_rel_path}/{certificate_path}" for certificate_path in fetch_file_names(certificates_dir_path)]
    return render_template("index.html", projects=Project.select(), certificate_paths=certificate_paths)


@app.route("/download")
def download_file():
    """Allow downloading the resume file."""
    path = "static/docs/johnombuya-resume.pdf"  # Specify the path to the resume file
    filename = "John Ombuya Resume.pdf"  # Set the name for the downloaded file
    return send_file(path, as_attachment=True, attachment_filename=filename)

if __name__ == "__main__":
    app.run(debug=True)
