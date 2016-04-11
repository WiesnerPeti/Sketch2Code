#import "PriceView.h"
@implementation PriceView
- (instancetype)initWithStyle:(UITableViewCellStyle)style reuseIdentifier:(NSString *)reuseIdentifier
{
    self = [super initWithStyle:style reuseIdentifier:reuseIdentifier];
    if(self)
    {
      //Subview initialization comes here
    }
    return self;
}
- (void)layoutSubviews
{
    [super layoutSubviews];

	[_arrow setFrame:CGRectMake(299,22,5,10)]
	[_titleLabel setFrame:CGRectMake(9,18,43,17)]
	[_priceLabel setFrame:CGRectMake(244,19,28,17)]
	[_priceBarImageView setFrame:CGRectMake(60,23,173,9)]
	[_backgroundView setFrame:CGRectMake(0,1,320,50)]

}
@end
