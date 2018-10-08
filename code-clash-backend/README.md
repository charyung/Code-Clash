# Codemash

## Get Started

Make sure you are using Python version 3.6 (not Python 2.x).
Many systems might require you to explicity call Python 3, even though it is the only one installed.
For example, instead of calling `python`, you might have to call `python3`.
Instead of calling `pip`, you might have to call `pip3`.
It's also recommended that you create a [virtual environment](https://github.com/pypa/virtualenv) for project dependencies. 

**Setup Dependencies:**

Firstly, activate your virtual environment and install Python dependencies from `pip`.
```
pip install -r requirements.txt
```

**Setup PostgreSQL:**

A useful [guide](https://wiki.archlinux.org/index.php/PostgreSQL) for setting up PostgreSQL on Linux distros. 
Another useful [guide](https://www.digitalocean.com/community/tutorials/how-to-install-and-use-postgresql-on-ubuntu-18-04) for Ubuntu.
Then create a database with the following configuration:
```
'NAME': 'codemash',
'USER': 'codemash_auth',
'PASSWORD': 'brianisBest2',
'HOST': 'localhost',
```

Finally, start the PostgreSQL service.

To run a test Django server, run the following command:
```
python manage.py migrate
python manage.py runserver 8080
```

# API Endpoints

| **URL** | **METHOD** | **Parameters** | **Description** |
| ------------- |:-------------:|:-----:|:------:|
| `user/create/` | `POST` | `email&utorid&first_name&last_name&password` | Creates a new user with the given information. |
| `api-token-auth/` | `POST` | `email&password` | Requests a token with the supplied username and password. |

