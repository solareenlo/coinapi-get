FROM node:10.15.3-alpine

RUN apk add --no-cache \
    vim \
    git \
    curl

RUN curl https://raw.githubusercontent.com/Shougo/dein.vim/master/bin/installer.sh > installer.sh
RUN sh ./installer.sh ~/.cache/dein
RUN curl https://raw.githubusercontent.com/solareenlo/vim-config/master/.vimrc > /root/.vimrc
RUN mkdir /root/.vimbackup

WORKDIR /app

COPY ./package.json ./
RUN npm install

COPY ./ ./
ENV TERM=xterm-256color
