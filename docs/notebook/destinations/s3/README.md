# Amazon S3 Destination

[[toc]]

## S3 Bucket Policy

In order for us to deliver objects to your S3 bucket, you need to modify the [bucket policy](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/add-bucket-policy.html) for your target bucket, allowing Pipedream to upload objects.

The bucket policy below provides the minimum set of permissions necessary for Pipedream to deliver objects to your S3 bucket. We use the [Multipart Upload API](https://docs.aws.amazon.com/AmazonS3/latest/dev/uploadobjusingmpu.html) to upload objects to S3, and need the [necessary permissions](https://docs.aws.amazon.com/AmazonS3/latest/dev/mpuAndPermissions.html).

**Replace `[your bucket name]` with the name of your bucket** near the bottom of the policy.

```json
{
  "Version": "2012-10-17",
  "Id": "allow-pipedream-limited-access",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::203863770927:role/Pipedream"
      },
      "Action": [
        "s3:AbortMultipartUpload",
        "s3:GetBucketLocation",
        "s3:PutObject",
        "s3:PutObjectAcl",
        "s3:ListBucketMultipartUploads"
      ],
      "Resource": [
        "arn:aws:s3:::[your bucket name]",
        "arn:aws:s3:::[your bucket name]/*"
      ]
    }
  ]
}
```
