from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer, NoteSerializer
from rest_framework.permissions import IsAuthenticated, AllowAny
from .models import Note

# Create your views here.
# handles creating a new user or creating a new object
class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all() #list of different objects which we will look at when creating a new one
    serializer_class = UserSerializer #serializer class to explain the kind of data that we want in order to make a new user
    permission_classes = [AllowAny] #specifies who can actaully call this. for this case anyone

# list or creates all the notes even the new notes
class NoteListCreate(generics.ListCreateAPIView):
    serializer_class = NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user= self.request.user #ensures that we get a user that is authenticated
        # return Note.objects.all() (here you get all the notes that are written by this specific user)
        return Note.objects.filter(author=user)

    def perform_create(self, serializer):
        if serializer.is_valid(): #if we pass any data the serializer confirms to us if the data is valid  
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)

class NoteDelete(generics.DestroyAPIView): 
    serializer_class= NoteSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user= self.request.user 
        return Note.objects.filter(author=user)
     
