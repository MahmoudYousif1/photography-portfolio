use reqwest;
use serde_json::Value;
use tokio;

#[tokio::test]
async fn test_get_photo_by_id_success() {
    let response = reqwest::Client::new()
        .get("http://localhost:30002/api/v1/photos/2")
        .send()
        .await
        .expect("Failed to send request");

    assert_eq!(response.status(), 200);
    let photo: Value = response.json().await.expect("Failed to parse JSON");

    assert!(photo.is_object());
    assert_eq!(photo["id"], "2");
    assert!(photo["title"].is_string());
    assert!(photo["cameraInfo"].is_object());
    assert!(photo["cameraInfo"]["camera"].is_string());
    assert!(photo["cameraInfo"]["iso"].is_number());
}

#[tokio::test]
async fn test_get_photo_by_invalid_id() {
    let response = reqwest::Client::new()
        .get("http://localhost:30002/api/v1/photos/999")
        .send()
        .await
        .expect("Failed to send request");

    assert_eq!(response.status(), 404);
}
