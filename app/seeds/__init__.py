from flask.cli import AppGroup
from .users import seed_users, undo_users
from .securities import seed_securities, undo_securities
from .user_securities import seed_user_securities, undo_user_securities

# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')

# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_securities()
    seed_user_securities()
    # Add other seed functions here

# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_securities()
    undo_user_securities()
    # Add other undo functions here
