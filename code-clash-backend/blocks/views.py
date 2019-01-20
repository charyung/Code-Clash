from django.shortcuts import render, get_object_or_404
from django.http import HttpResponse
from django.template import loader

from .models import BlockUtils, Block

# Create your views here.
def index(request):
    choices = BlockUtils.getEntries()
    context = { "choices": choices }
    return render(request, "blocks/index.html", context)
    
def detail(request, block_id):
    return HttpResponse(Block.objects.get(pk=block_id).code)
    
def vote(request):
    try:
        #win = Block.objects.get(pk=request.POST["choice"][0])
        #lose = Block.objects.get(pk=request.POST["choice"][1])
        choices = Block.objects.get(pk=request.POST["choice"])
    except (KeyError, Block.DoesNotExist):
        return render(request, "blocks/index.html", {
            "choices": choices,
            "error_message": "pick a one that exists",
        })
    else:

        return Http