package spdn.be.controllers;

//@CrossOrigin()
//@RestController
public class ImageController {
//    @Autowired
//    private ImageRepository imageRepository;
//    @PostMapping("/upload/image")
//    public ResponseEntity<ImageUploadResponse> uploadImage(@RequestParam("image") MultipartFile file)
//            throws IOException {
//
//        imageRepository.save(Image.builder()
//                .imageName(file.getOriginalFilename())
//                .type(file.getContentType())
//                .image(ImageUtils.compressImage(file.getBytes())).build());
//        return ResponseEntity.status(HttpStatus.OK)
//                .body(new ImageUploadResponse("Image uploaded successfully: " +
//                        file.getOriginalFilename()));
//    }
//    @GetMapping(path = {"/get/image/info/{name}"})
//    public Image getImageDetails(@PathVariable("name") String name) throws IOException {
//
//        final Optional<Image> dbImage = imageRepository.findByName(name);
//
//        return Image.builder()
//                .imageName(dbImage.get().getImageName())
//                .type(dbImage.get().getType())
//                .image(ImageUtils.decompressImage(dbImage.get().getImage())).build();
//    }
//
//    @GetMapping(path = {"/get/image/{name}"})
//    public ResponseEntity<byte[]> getImage(@PathVariable("name") String name) throws IOException {
//
//        final Optional<Image> dbImage = imageRepository.findByName(name);
//
//        return ResponseEntity
//                .ok()
//                .contentType(MediaType.valueOf(dbImage.get().getType()))
//                .body(ImageUtils.decompressImage(dbImage.get().getImage()));
//    }
}
