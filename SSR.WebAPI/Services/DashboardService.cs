using SSR.WebAPI.Data;
using SSR.WebAPI.Interfaces;
using SSR.WebAPIViewModels;
using MongoDB.Driver;

namespace SSR.WebAPI.Services
{
    public class DashboardService : BaseService, IDashboardService
    {

        private DataContext _context;

        public DashboardService(DataContext context,
            IHttpContextAccessor contextAccessor)
            : base(context, contextAccessor)
        {
            _context = context;
        }

        public async Task<DashboardVM> GetDashboard()
        {
            DashboardVM vm = new DashboardVM();

            var soTinTucSuKien = _context.Posts.Find(x => x.IsDeleted != true && x.Category != default && x.Category.Code == "TTSK").CountDocumentsAsync();
            var soTuyenDung = _context.Posts.Find(x => x.IsDeleted != true && x.Category != default && x.Category.Code == "TD").CountDocumentsAsync();
            var soPhongMay = _context.Room.Find(x => x.IsDeleted != true).CountDocumentsAsync();
            var soNhanVien = _context.Posts.Find(x => x.IsDeleted != true).CountDocumentsAsync();

            await Task.WhenAll(soTinTucSuKien, soTuyenDung, soPhongMay, soNhanVien);

            vm.SoTinTucSuKien = soTinTucSuKien.Result;
            vm.SoTuyenDung = soTuyenDung.Result;
            vm.SoPhongMay = soPhongMay.Result;
            vm.SoNhanVien = soNhanVien.Result;
            return vm;
        }
    }
}
