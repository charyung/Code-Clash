from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import loader
from django.core import serializers
import json

from .models import BlockUtils, Block

# Create your views here.
def index(request):
    choices = BlockUtils.getEntries()
    serialized_choices = serializers.serialize('json', choices)
    #return render(request, "blocks/index.html", context)
    return HttpResponse(serialized_choices, content_type='application/json')
    
def detail(request, block_id):
    return HttpResponse(Block.objects.get(pk=block_id).code)
    
def vote(request):
    try:
        print("right")
        requestBody = json.loads(request.body)
        #winner = Block.objects.get(pk=requestBody['winner'])
        #loser = Block.objects.get(pk=requestBody['loser'])
        #print(winner)
        #votes = Block.objects.get(pk=request.POST["choice"])
        BlockUtils.vote(requestBody['winner'], requestBody['loser'])
    except (KeyError, Block.DoesNotExist, ValueError):
        print("wrong")
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
        return HttpResponseRedirect(reverse("blocks", args=(winner, loser)))