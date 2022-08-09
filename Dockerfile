FROM synesthesiam/coqui-tts

WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
ENV PORT=8080
CMD [ "node" , "extract" ]
VOLUME [ "." ]