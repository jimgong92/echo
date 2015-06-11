import psycopg2
from ..db import conn

def add_echo(echo_obj):
  cur = conn.cursor()
  text = echo_obj['text']
  res = {'text': text, 'isSuccessful': True}
  try:
    cur.execute("INSERT INTO echos (echo_id, echo_text) VALUES (DEFAULT, %s) RETURNING echo_id", (text,))
    res['id'] = cur.fetchone()[0]
    save(cur)
  except:
    res['isSuccessful'] = False
  finally:
    return res

def get_all_echos():
  print 'in get_all_echos'
  cur = conn.cursor()
  cur.execute("SELECT * FROM echos;")
  res = cur.fetchall()
  save(cur)
  return res

def save(cursor):
  conn.commit()
  cursor.close()
  # conn.close()