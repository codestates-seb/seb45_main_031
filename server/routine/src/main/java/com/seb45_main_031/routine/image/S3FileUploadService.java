package com.seb45_main_031.routine.image;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.seb45_main_031.routine.exception.BusinessLogicException;
import com.seb45_main_031.routine.exception.ExceptionCode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
public class S3FileUploadService {
    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Autowired
    private AmazonS3 amazonS3;

    private void checkFileForm(MultipartFile file){

        List<String> imageForm = Arrays.asList("jpg", "jpeg", "png", "gif", "bmp");

        String fileForm = file.getOriginalFilename()
                .substring(file.getOriginalFilename().lastIndexOf(".") + 1)
                .toLowerCase();

        if (!imageForm.contains(fileForm)) {
            throw new BusinessLogicException(ExceptionCode.FILE_TYPES_NOT_ALLOWED);
        }
    }

    public String uploadImageFile(MultipartFile file){

        String fileName = System.currentTimeMillis() + "." + file.getOriginalFilename();

        checkFileForm(file);

        try{
            ObjectMetadata metadata = new ObjectMetadata();
            metadata.setContentType(file.getContentType());
            metadata.setContentLength(file.getSize());
            metadata.setContentDisposition("inline");

            amazonS3.putObject(new PutObjectRequest(bucketName, fileName, file.getInputStream(), metadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));

        }
        catch (IOException e){
            throw new BusinessLogicException(ExceptionCode.FILE_INPUT_STREAM_ERROR);
        }

        String fileUrl = amazonS3.getUrl(bucketName, fileName).toString();

        return fileUrl;

    }
}
