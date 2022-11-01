using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DAL.Migrations
{
    public partial class ChangeContentMaxLengthAddAppUserToCommentary : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commentaries_Posts_PostId",
                table: "Commentaries");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "Commentaries");

            migrationBuilder.RenameColumn(
                name: "PostId",
                table: "Commentaries",
                newName: "ForPostId");

            migrationBuilder.RenameIndex(
                name: "IX_Commentaries_PostId",
                table: "Commentaries",
                newName: "IX_Commentaries_ForPostId");

            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Commentaries",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Commentaries_CreatedById",
                table: "Commentaries",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Commentaries_AspNetUsers_CreatedById",
                table: "Commentaries",
                column: "CreatedById",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Commentaries_Posts_ForPostId",
                table: "Commentaries",
                column: "ForPostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Commentaries_AspNetUsers_CreatedById",
                table: "Commentaries");

            migrationBuilder.DropForeignKey(
                name: "FK_Commentaries_Posts_ForPostId",
                table: "Commentaries");

            migrationBuilder.DropIndex(
                name: "IX_Commentaries_CreatedById",
                table: "Commentaries");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Commentaries");

            migrationBuilder.RenameColumn(
                name: "ForPostId",
                table: "Commentaries",
                newName: "PostId");

            migrationBuilder.RenameIndex(
                name: "IX_Commentaries_ForPostId",
                table: "Commentaries",
                newName: "IX_Commentaries_PostId");

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "Commentaries",
                type: "TEXT",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Commentaries_Posts_PostId",
                table: "Commentaries",
                column: "PostId",
                principalTable: "Posts",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
