import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-generator-view',
  templateUrl: './url-generator.component.html',
  styleUrls: ['./url-generator.component.css'],
})
export class UrlGenerator implements OnInit {
  longUrl = '';
  shortUrl = '';
  formHasChanged = false;
  urlform: FormGroup;
  urlError: string = 'Please enter a valid url';
  urlInvalid: boolean = false;
  shortUrlGenerated = false;

  private readonly urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+(:[0-9]+)?|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.urlform = this.fb.group({
      longUrlInput: ['', [Validators.required]],
    });
    this.urlform.valueChanges.subscribe(() => {
      this.formHasChanged = true;
      this.shortUrlGenerated = false;
    });
  }

  generateShortUrl() {
    console.log('generate short url clicked');
    if (this.formHasChanged && this.urlform.valid) {
      const longUrl = this.urlform.get('longUrlInput').value;
      if (!this.urlRegex.test(longUrl)) {
        this.urlInvalid = true;
        return;
      }
      this.getShortUrl(longUrl);
      console.log('Url validated', longUrl);
    }
  }

  async getShortUrl(longUrl: string): Promise<void> {
    try {
      const shorUrlResp: any = await this.http
        .post(
          'http://localhost:3000/url/tinyUrl',
          {
            longUrl,
          },
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
            },
          }
        )
        .toPromise();
      console.log(shorUrlResp);
      this.shortUrlGenerated = true;
      this.shortUrl = shorUrlResp.shortUrl;
      // return shorUrlResp;
    } catch (err) {
      this.shortUrlGenerated = false;
      alert(err.details.message);
    }
  }
}
