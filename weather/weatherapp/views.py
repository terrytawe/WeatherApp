import json
import requests # type: ignore
from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse

# Create your views here.
def index(request):

    if request.method == "POST":
        api_key = settings.WEATHER_API
        city = json.loads(request.body)['selectedText'] 
        url = f'http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}'

        response = requests.get(url)
        data = response.json()

        print(data)

        context = {
            'city': city,
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description'],
        }

        return JsonResponse({
            'city': city,
            'temperature': data['main']['temp'],
            'description': data['weather'][0]['description']
        })
    
    return render(request, 'weatherapp/index.html')