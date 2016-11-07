from flask import Flask, render_template,jsonify
import datetime
import os
import picamera
imageName="static/parkingLot.jpg"
app = Flask(__name__)

def takeImage():
   camera = picamera.PiCamera()
   camera.hflip = True
   camera.vflip = True
   # You can use the stop_preview method to remove the preview overlay and restore the display:
   # camera.stop_preview()

   camera.sharpness = 5
   camera.contrast = 80
   camera.brightness = 64
   camera.saturation = 0
   camera.ISO = 0
   camera.video_stabilization = True
   camera.exposure_compensation = 0
   camera.exposure_mode = 'auto'
   camera.meter_mode = 'average'
   camera.awb_mode = 'auto'
   camera.image_effect = 'none'
   camera.color_effects = None
   camera.rotation = 180
   camera.hflip = False
   camera.vflip = False
   camera.crop = (0.0, 0.0, 1.0, 1.0)
   camera.brightness = 60
   camera.capture(imageName)
   camera.close()

@app.route("/")
def hello():
   now = datetime.datetime.now()
   timeString = now.strftime("%Y-%m-%d %H:%M")
   templateData = {
      'title' : 'HELLO!',
      'time': timeString
      }
   # takeImage()
   return render_template('main.html', **templateData)

@app.route("/getImageUrl/")
def captureImage():

    takeImage()
     # This is a dummy list, 2 nested arrays containing some
    # params and values
    list = [
        {'imageName': imageName.split("/")[1], 'relImagePath':imageName }
    ]
    # jsonify will do for us all the work, returning the
    # previous data structure in JSON
    return jsonify(results=list[0])

if __name__ == "__main__":
   app.run(host='0.0.0.0', port=5000, debug=True)