# Django
from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.urls import reverse
from django.template import loader
from django.core import serializers
from django.conf import settings

# Python
import json

from .models import BlockUtils, Block

# Create your views here.
def index(request):
    # TODO: something about MEDIA_ROOT and something about MEDIA_URL
    return HttpResponse(serializers.serialize('json', Block.objects.all()))
    
def get(request, block_id):
    return HttpResponse(serializers.serialize('json', [Block.objects.get(pk=block_id)]))

def getTwoBlocks(request):
    choices = BlockUtils.getEntries()
    serialized_choices = serializers.serialize('json', choices)
    #return render(request, "blocks/index.html", context)
    return HttpResponse(serialized_choices, content_type='application/json')
    
def vote(request):
    try:
        requestBody = json.loads(request.body)
        #winner = Block.objects.get(pk=requestBody['winner'])
        #loser = Block.objects.get(pk=requestBody['loser'])
        #print(winner)
        #votes = Block.objects.get(pk=request.POST["choice"])
        BlockUtils.vote(requestBody['winner'], requestBody['loser'])
    except (KeyError, Block.DoesNotExist, ValueError):
        serialized_error = serializers.serialize('json', {
            "choices": choices,
            "error_message": "pick a one that exists",
        })
        return HttpResponse(serialized_error, content_type='application/json')
        #return render(request, "blocks/index.html", {
        #    "choices": choices,
        #    "error_message": "pick a one that exists",
        #})
    else:
        print("done");
        return HttpResponse()

def create(request):
    try:
        requestBody = request.FILES.getlist('files')
        BlockUtils.createCode(requestBody);
    except Exception as e:
        serialized_error = serializers.serialize('json', {
            "error_message": e,
        })
        return HttpResponse(e, content_type='application/json', status_code = 400)
    else:
        return HttpResponse()