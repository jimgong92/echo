# Echo
Geolocation-based messaging aggreggator.

## Table of Contents

1. [Example Usage](#example-usage)
2. [Development](#development)
  1. [Setup](#setup)
  2. [Installing Dependencies](#installing-dependencies)
  3. [Running](#running)
3. [Stack](#Stack)

## Example Usage

## Development

### Setup
- Install [Postgres.app](http://postgresapp.com/)
- Run Postgres.app
- Create virtual environment for Python dependencies:
  ```
  virtualenv venv
  source venv/bin/activate
  ```

### Installing Dependencies
- Install node dependencies:
  ```
  npm install
  ```

- Install python dependencies:
  ```
  pip install -r requirements.txt
  ```

### Running
```
gulp
python run.py
```

## Stack

- PostgreSQL
- SQLAlchemy
- Python
- React
- Flux