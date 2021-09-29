from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
#from snippets.models import Snippet
#from snippets.serializers import SnippetSerializer
from getImage.models import Image
from getImage.serializers import ImageSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework import permissions

##
from django.http import JsonResponse
from facenet_pytorch import MTCNN, InceptionResnetV1
import torch
from torchvision import datasets
from torch.utils.data import DataLoader
from PIL import Image
import torchvision
import os
import time


@api_view(['GET', 'POST'])
@permission_classes((permissions.AllowAny,))
def image_list(request, format=None):
    """
    List all code snippets, or create a new snippet.
    """
    if request.method == 'GET':
        images = Image.objects.all()
        serializer = ImageSerializer(images, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = ImageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()

            # 폴더 생성

            # crop

            # mtcnn = MTCNN(image_size=240, margin=0, min_face_size=20) # mtcnn 초기화
            # dataset=datasets.ImageFolder('media') # 사진 폴더 경로

            # 체크
            # initializing mtcnn for face detection
            mtcnn = MTCNN(image_size=240, margin=0, min_face_size=20)
            # initializing resnet for face img to embeding conversion
            resnet = InceptionResnetV1(pretrained='vggface2').eval()

            path = "media/face/b123456"
            file_list = os.listdir(path)
            img = Image.open("media/face/b123456/" + file_list[0])
            time.sleep(1)
            print("sleep1")
            img = img.transpose(Image.ROTATE_90)
            img_cropped = mtcnn(
                img, save_path="media/croppedface/b123456/"+"cropped_b123456"+".jpg")
            time.sleep(1)
            print("sleep2")

            # img_path= location of photo, data_path= location of data.pt
            def face_match(img_path, data_path):
                # getting embedding matrix of the given img
                img = Image.open(img_path)
                # returns cropped face and probability
                face, prob = mtcnn(img, return_prob=True)
                # detech is to make required gradient false
                emb = resnet(face.unsqueeze(0)).detach()

                saved_data = torch.load(data_path)  # loading data.pt file
                # print(saved_data)
                embedding_list = saved_data[0]  # getting embedding data
                name_list = saved_data[1]  # getting list of names
                dist_list = []  # list of matched distances, minimum distance is used to identify the person

                for idx, emb_db in enumerate(embedding_list):
                    dist = torch.dist(emb, emb_db).item()
                    dist_list.append(dist)

                # print(len(embedding_list))
                # print(embedding_list[0].shape)
                # print(type(embedding_list[0]))

                idx_min = dist_list.index(min(dist_list))
                return (name_list[idx_min], min(dist_list))

            result = face_match(
                'media/croppedface/b123456/cropped_b123456.jpg', 'golo3.pt')
            print(result)
            dummy_data = {
                "title": "student check",
                "description": "dd",
                "check_list": [
                    {"id": result[0], "studentId": "b123456",
                        "check": result[1]},
                    {"id": "test id", "studentId": "test student id",
                        "check": "test check"},
                ]
            }
            # 삭제

            return JsonResponse(dummy_data, status=status.HTTP_201_CREATED)
            # return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)