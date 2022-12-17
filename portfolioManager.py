from peewee import *
from flask_login import UserMixin, login_user, LoginManager, login_required, current_user, logout_user


#--------------------------- CONNECT TO DATABASE ------------------------------#
database_projects = SqliteDatabase('databases/projects.db')

''' Model definitions -- the standard "pattern" is to define a base model class that specifies which database to use.  then, any subclasses will automaticallyuse the correct storage'''
class BaseModel(Model):
    class Meta:
        database = database_projects
        table_name = 'projects'

# The user model specifies its fields (or columns) declaratively, like django
class Project(UserMixin, BaseModel):
    id = AutoField(unique=True, null=False)
    h4 = CharField()
    h6 = CharField()
    p = TextField()
    link = CharField()
    img_url = CharField()

Project.create_table()

