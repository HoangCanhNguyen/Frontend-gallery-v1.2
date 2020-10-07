export class CommentNotiModel {
    constructor(
      public pic_id: string,
      public pic_title: string,
      public created_at: string,
      public commenter_username: string,
      public category: string
    ) {
      this.pic_id = pic_id;
      this.pic_title = pic_title;
      this.created_at = created_at;
      this.commenter_username = commenter_username;
      this.category = category
    }
  }
  