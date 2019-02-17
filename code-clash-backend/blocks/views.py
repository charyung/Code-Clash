from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import loader
from django.core import serializers

from .models import BlockUtils, Block

# Create your views here.
def index(request):
    choices = BlockUtils.getEntries()
    serialized_choices = serializers.serialize('json', choices)
    context = { "choices": serialized_choices }
    #return render(request, "blocks/index.html", context)
    return HttpResponse(serialized_choices, content_type='application/json')
    
def detail(request, block_id):
    return HttpResponse(Block.objects.get(pk=block_id).code)
    
def vote(request, winner, loser):
    try:
        print(winner)
        #win = Block.objects.get(pk=request.POST["choice"][0])
        #lose = Block.objects.get(pk=request.POST["choice"][1])
        #votes = Block.objects.get(pk=request.POST["choice"])
    except (KeyError, Block.DoesNotExist):
        return render(request, "blocks/index.html", {
            "choices": choices,
            "error_message": "pick a one that exists",
        })
    else:

        return HttpResponseRedirect(reverse("blocks", args=(choices,)))