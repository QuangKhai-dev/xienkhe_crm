# Sử dụng image Node.js 16 để build ứng dụng React
FROM node:16

# Thiết lập thư mục làm việc trong container
WORKDIR /

# Sao chép package.json và package-lock.json vào thư mục làm việc
COPY package*.json ./

# Cài đặt các dependencies của ứng dụng
RUN npm install

# Sao chép các tệp và thư mục của ứng dụng vào thư mục làm việc
COPY . .

# Build ứng dụng React
RUN npm run build

# Port mà ứng dụng sẽ chạy trên container
EXPOSE 3001

# Khởi động ứng dụng React khi container được chạy
CMD [ "npm", "start" ]
