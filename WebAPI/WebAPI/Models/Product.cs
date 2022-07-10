using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebAPI.Models
{
    public class Product
    {
        [Key]
        public int ProductId { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string ProductName { get; set; }

        public int Quantity { get; set; }

        public DateTime ManufacturingDate { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string BatchNumber { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Supplier { get; set; }

        [Column(TypeName = "decimal(18, 2)")]
        public decimal CostPrice { get; set; }
    }
}
