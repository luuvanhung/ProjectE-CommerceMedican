package spdn.be.controllers;

import java.util.List;
import java.util.Arrays;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import spdn.be.payload.response.FileResponse;
import spdn.be.sercurity.services.IFileSytemStorage;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api")
public class FileController {

    @Autowired
    IFileSytemStorage fileSytemStorage;

    @PostMapping("/uploadfile")
    public ResponseEntity<FileResponse> uploadSingleFile(@RequestParam("file") MultipartFile file) {

        String upfile = fileSytemStorage.saveFile(file);

        String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                .path("/api/download/")
                .path(upfile)
                .toUriString();

        return ResponseEntity.status(HttpStatus.OK).body(new FileResponse(upfile, fileDownloadUri, "File uploaded with success!"));
    }

    @PostMapping("/uploadfiles")
    public ResponseEntity<List<FileResponse>> uploadMultipleFiles(@RequestParam("files") MultipartFile[] files) {

        List<FileResponse> responses = Arrays.asList(files)
                .stream()
                .map(
                        file -> {
                            String upfile = fileSytemStorage.saveFile(file);
                            String fileDownloadUri = ServletUriComponentsBuilder.fromCurrentContextPath()
                                    .path("/api/download/")
                                    .path(upfile)
                                    .toUriString();
                            return new FileResponse(upfile, fileDownloadUri, "File uploaded with success!");
                        }
                )
                .collect(Collectors.toList());

        return ResponseEntity.status(HttpStatus.OK).body(responses);
    }


    @GetMapping("/download/{filename:.+}")
    public ResponseEntity<Resource> downloadFile(@PathVariable String filename) {

        Resource resource = fileSytemStorage.loadFile(filename);

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + resource.getFilename() + "\"")
                .body(resource);
    }

}

