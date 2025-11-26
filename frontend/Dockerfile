FROM nginx:alpine

# Copia da pasta SRC (onde estão seus arquivos)
COPY src/ /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]