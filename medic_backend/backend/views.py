from django.shortcuts import render
import os
import base64
from langchain_core.messages import HumanMessage
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain_google_genai import GoogleGenerativeAIEmbeddings
from langchain_google_genai import ChatGoogleGenerativeAI
from langchain.prompts import PromptTemplate
from langchain_pinecone import PineconeVectorStore
from langchain_core.output_parsers import StrOutputParser
from rest_framework.views import APIView
from backend.serializer import Conversation_serializer,RegisterSerializer,LoginSerializer
from django.contrib.auth.models import User
from backend.models import Conversation
from rest_framework.response import Response
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
import re
from dotenv import load_dotenv
load_dotenv()
API=os.environ.get("GOOGLE_API_KEY")
os.environ.get("PINECONE_API_KEY")
embedding = GoogleGenerativeAIEmbeddings(model="models/embedding-001")
index_name = "testing"
vector_store = PineconeVectorStore.from_existing_index(
    index_name=index_name,
    embedding=embedding
)
API=os.environ["GOOGLE_API_KEY"]="AIzaSyBiXp3SS_38UFKiG3oZbA30ET0P52y0ndc"
llm=ChatGoogleGenerativeAI(
    model="gemini-2.5-pro",
    api_key=API
)
class Query(APIView):
 permission_classes = [IsAuthenticated]
 def post(self,request):
   query = request.data.get('query')
   user = request.user.username
   docs = vector_store.similarity_search(query,k=3)
   client=ChatGoogleGenerativeAI(
     model="gemini-2.5-pro",
     google_api_key=API
    )
   prompt_template=PromptTemplate(
    input_variables=["context","question"],
    template="""Use the following pieces of information to answer the user's question.
    If you don't know the answer,just say that you don't know,don't try to make up an answer.
    Context: {context}
    Question: {question}
    Only return the helpful answer below and nothing else
    Helpful answer:
    """
   )
   chain = prompt_template | client | StrOutputParser()
   result=chain.invoke({"context":docs,"question":query})
   text = re.sub(r'\*{1,2}(.*?)\*{1,2}', r'\1', result)
   return Response(text)
   
class Image(APIView):
 permission_classes = [IsAuthenticated]
 def post(self,request):
  image=request.FILES.get('image')
  username=request.user.username
  data={'user': username,'send':"Image",'receive':"Image", 'file': image}
  if Conversation.objects.filter(user=request.user,send='Image').exists():
    return Response("over")
  serializer= Conversation_serializer(data=data)
  if serializer.is_valid():
    serializer.save()
    img_path=serializer.instance.file.path
    with open(img_path,"rb")as img_file:
     img_byte=img_file.read()
     encoded_img = base64.b64encode(img_byte).decode("utf-8")
     data_url= f"data:image/jpeg;base64,{encoded_img}"
     prompt_text = (
    "You are a medical report analysis assistant.\n"
    "I will give you the image of a patient's medical report.\n"
    "Your task is to:\n"
    "1. Summarize the findings in simple language.\n"
    "2. List any medical problems, abnormalities, or concerning results.\n"
    "3. Provide general recommendations or next steps for treatment, lifestyle changes, or further testing.\n"
    "4. Add a disclaimer that this is not a medical diagnosis and the patient should consult a licensed doctor.\n"
     "or if you think the given image is not medical report then say It's Not a Medical Report"
)
    message=HumanMessage(
        content=[
            {"type":"text","text":prompt_text},
            {"type": "image_url", "image_url": {"url": data_url}}
        ]
     )
    response=llm.invoke([message])
    raw_text = response.content  
    clean_text = re.sub(r'[*#]', '', raw_text)
    return Response({"result": clean_text})
  return Response(serializer.errors)
 
class Register(APIView):
 def post(self,request):
  data=request.data
  serializer=RegisterSerializer(data=data)
  if serializer.is_valid(raise_exception=True):
    serializer.save()
    return Response("Register")
  return Response(serializer.errors)
 
class Login(APIView):
 def post(self,request):
  data=request.data
  serializer= LoginSerializer(data=data)
  if serializer.is_valid():
     user=authenticate(username=serializer.data['username'],password=serializer.data['password'])
     if user is not None:
        token, created = Token.objects.get_or_create(user=user)
        tok=token.key
        return Response({'username':data['username'],'token': tok})
  return Response(False)