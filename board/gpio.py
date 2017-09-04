import RPi.GPIO as gpio
from pusher import Pusher
import time

pusher = Pusher(app_id=u'394325', key=u'cc900daae41222ea463e', secret=u'02ae96830fe03a094573', cluster=u'eu')
gpio.setmode(gpio.BCM)
gpio.setup(2, gpio.OUT)

# TODO: Map each gpio pin to a room eg 2: HNG Main
while True:
	gpio.output(2, gpio.OUT)
	passcode = raw_input('What is pi? ')

	if passcode == 'Awesome':
		gpio.output(2, gpio.HIGH)
		pusher.trigger(u'statuses', u'new_status', {u'room': u'HNG Main', u'status': u'Off'})
		time.sleep(4)
	else:
		gpio.output(2. gpio.LOW)
		print 'Wrong Password'
