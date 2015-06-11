import psycopg2
from ..db import conn

def add_echo(echo_obj):
  cur = conn.cursor()
  text = echo_obj['text']
  res = {'text': text, 'isSuccessful': True}
  try:
    cur.execute("INSERT INTO echos (echo_id, echo_text, echo_date) "
                "VALUES (DEFAULT, %s, 'now') "
                "RETURNING echo_id, echo_date", (text,))
    end = cur.fetchone()
    res['id'] = end[0];
    res['date'] = end[1]
    save(cur)
  except:
    res['isSuccessful'] = False
  finally:
    return res

def get_all_echos():
  cur = conn.cursor()
  cur.execute("SELECT * FROM echos;")
  res = formatAllRows(cur.fetchall())
  save(cur)
  return res

def save(cursor):
  conn.commit()
  cursor.close()

def formatRow(row):
  return {'id': row[0], 'text': row[1], 'date': row[2]}

def formatAllRows(row_list):
  res = []
  for i in range(len(row_list)):
    res.append(formatRow(row_list[i]))
  print res
  return res