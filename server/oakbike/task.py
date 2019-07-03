import requests
import json
from oakbike.models import Report
from datetime import datetime, timedelta, timezone
import pytz


def get_311_data():

    # TODO Determine what params to include
    params = {"description": "Streets - Potholes/Depression"}
    response = requests.get(
        "https://data.oaklandnet.com/resource/x4j5-hbm8.json", params=params
    )
    data = response.json()
    return data


def upload_311_data(pause_time=timedelta(days=3)):

    data = get_311_data()

    for report in data:
        if "reqaddress" in report.keys():
            # Spliting time at decimal seconds and dropping the fractional seconds
            report_time = report["datetimeinit"].split(".")[0]
            report_time = datetime.strptime(report_time, "%Y-%m-%dT%H:%M:%S")

            report_time = pytz.timezone("America/Los_Angeles").localize(report_time)
            report_time = report_time.astimezone(pytz.timezone("UTC"))

            if report_time > (datetime.now(timezone.utc) - pause_time):

                Report.objects.create(
                    lat=report["reqaddress"]["coordinates"][1],
                    lng=report["reqaddress"]["coordinates"][0],
                    date_created=report_time,
                    source="311",
                )
