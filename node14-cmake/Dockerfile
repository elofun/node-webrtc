FROM node:14

RUN apt-get update && apt-get install build-essential git -y

RUN git clone --depth=1 --branch=release https://github.com/Kitware/CMake.git cmake \
  && cd cmake \
  && ./bootstrap \
  && make \
  && make install \
  && cd .. \
  && rm -rf ./cmake



