import psycopg2
from ..db import conn

SRID = 4326
M_PER_MI = 1609.34
MI_PER_DEGREE = 1 / 69.17

def add_echo(echo_obj):
  cur = conn.cursor()
  text = echo_obj['text']
  lon = echo_obj['lon']
  lat = echo_obj['lat']
  res = {'text': text, 'isSuccessful': True, 'lon': lon, 'lat': lat}
  try:
    cur.execute("INSERT INTO echos (echo_id, echo_text, echo_date, echo_location) "
                "VALUES (DEFAULT, %s, 'now', ST_SetSRID(ST_MakePoint(%s, %s), %s)) "
                "RETURNING echo_id, echo_date;", (text, lon, lat, SRID))
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
  cur.execute("SELECT echo_id, echo_text, echo_date, ST_X(echo_location), ST_Y(echo_location) FROM echos;")
  res = formatAllRows(cur.fetchall())
  save(cur)
  return res

def get_echos(params):
  lon = params.get('lon')
  lat = params.get('lat')
  r = utfifyNum(int(params.get('radius')) * MI_PER_DEGREE)
  cur = conn.cursor()
  cur.execute("SELECT echo_id, echo_text, echo_date, ST_X(echo_location), ST_Y(echo_location) FROM echos "
              "WHERE ST_DWITHIN(echo_location, ST_SetSRID(ST_MakePoint(%s, %s), %s), %s);", (lon, lat, SRID, r))
  res = formatAllRows(cur.fetchall())
  save(cur)
  return res

def save(cursor):
  conn.commit()
  cursor.close()

def formatRow(row):
  return {
    'id': row[0],
    'text': row[1],
    'date': row[2],
    'lon': row[3],
    'lat': row[4]
  }

def formatAllRows(row_list):
  res = []
  for i in range(len(row_list)):
    res.append(formatRow(row_list[i]))
  print res
  return res


def utfifyNum(n):
  return unicode(str(n), 'utf-8')