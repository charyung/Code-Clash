from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import loader
from django.core import serializers

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
    print(request.body)
    try:
        print("right")
        print(winner)
        #win = Block.objects.get(pk=request.POST["choice"][0])
        #lose = Block.objects.get(pk=request.POST["choice"][1])
        #votes = Block.objects.get(pk=request.POST["choice"])
    except (KeyError, Block.DoesNotExist):
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