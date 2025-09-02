use reqwest;
use serde_json::Value;
use tokio;

#[tokio::test]
async fn test_get_all_photos_success() {
    let response = reqwest::Client::new()
        .get("http://localhost:30002/api/v1/photos")
        .send()
        .await
        .expect("Failed to send request");

    assert_eq!(response.status(), 200);
    let body: Value = response.json().await.expect("Failed to parse JSON");

    assert!(body.is_array());
    let photos = body.as_array().unwrap();
    assert!(!photos.is_empty());

    let photo = &photos[0];
    assert!(photo["id"].is_string());
    assert!(photo["title"].is_string());
    assert!(photo["cameraInfo"].is_object());
    assert!(photo["cameraInfo"]["camera"].is_string());
    assert!(photo["cameraInfo"]["iso"].is_number());
}
