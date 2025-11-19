FROM nginx:alpine

# Copia os arquivos do frontend para o nginx
COPY src/ /usr/share/nginx/html/

# Expõe a porta 80
EXPOSE 80

# Comando para iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]