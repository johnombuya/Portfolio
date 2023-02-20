from flask import Flask, render_template, send_file
from flask_bootstrap import Bootstrap

from portfolioManager import *


app = Flask(__name__)
app.config["SECRET_KEY"] = "8BYkEfBA6O6donzWlSihBXox7C0sKR6b"
Bootstrap(app)


@app.route("/")
def home():
    return render_template("index.html", projects=Project.select())


@app.route("/about")
def about():
    return render_template("about.html")


@app.route("/contact")
def contact():
    return render_template("contact.html")


@app.route("/download")
def download_file():
    # specify the path to your file here
    path = "static/docs/johnombuya-resume.pdf"
    # set the name you want the file to be downloaded as
    filename = "John Ombuya Resume.pdf"
    # return the file as a downloadable attachment
    return send_file(path, as_attachment=True, attachment_filename=filename)


if __name__ == "__main__":
    app.run(debug=True)
