from django.urls import path
from . import views

urlpatterns = [
    path("notes/", views.NoteListCreate.as_view(), name="note-list"),
    path("notes/deletes/<int:pk>", views.NoteDelete.as_view, name = 'delete-note'),

]