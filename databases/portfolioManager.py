import os
from peewee import *

# --------------------------- DATABASE CONNECTION ---------------------------- #
# Database connection to 'portfolio.db' located in a 'databases' directory
database_path = os.path.join(
    os.path.dirname(os.path.realpath(__file__)),
    'portfolio.db'
)
database_portfolio = SqliteDatabase(database_path)


# ---------------------------- MODEL DEFINITIONS ----------------------------- #
class BaseModel(Model):
    """
    Base model class that defines the database to be used by all inheriting models.
    """
    class Meta:
        database = database_portfolio


class Projects(BaseModel):
    """
    Model representing a project in the portfolio.

    Attributes:
        id (int): Auto-incremented unique identifier for the project.
        title (str): Main title or heading for the project.
        subtitle (str): Subtitle or smaller heading for the project.
        description (str): Project description text.
        link (str): Link to the project (e.g., live demo or repository URL).
        img_url (str): URL to an image representing the project.
    """
    id = AutoField(primary_key=True)
    title = CharField()
    subtitle = CharField()
    description = TextField()
    link = CharField()
    img_url = CharField()


class Certificates(BaseModel):
    """
    Model representing a certificate in the portfolio.

    Attributes:
        id (int): Auto-incremented unique identifier for the certificate.
        img_path (str): Path to the image file representing the certificate.
        title (str): Main title or heading for the certificate.
        description (str): Textual description of the certificate.
    """
    id = AutoField(primary_key=True)
    img_path = CharField()
    title = CharField()
    description = TextField()


# --------------------------- INITIALIZE DATABASE ---------------------------- #
def initialize_database():
    """
    Initialize the database by creating tables for all defined models if they do not already exist.
    """
    with database_portfolio:
        database_portfolio.create_tables([Projects, Certificates], safe=True)



initialize_database()
