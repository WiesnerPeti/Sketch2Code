#import "PriceView.h"
@implementation PriceView
- (instancetype)initWithFrame:(CGRect)frame
{
    self = [super initWithFrame:frame];
    if(self)
    {
	_backgroundView = [UIView new];
	_backgroundView.backgroundColor = [UIColor colorWithRed:1 green:1 blue:1 alpha:1];


	_priceBarImageView = [UIView new];
	_priceBarImageView.backgroundColor = [UIColor colorWithRed:0 green:0.5176 blue:1 alpha:1];


	_priceLabel = [UILabel new];
	_priceLabel.text = @"$220";
	_priceLabel.font = [UIFont fontWithName:@"SourceSansPro-Regular" size:14];
	_priceLabel.textColor = [UIColor colorWithRed:0.2039 green:0.2118 blue:0.2392 alpha:1];


	_titleLabel = [UILabel new];
	_titleLabel.text = @"Section";
	_titleLabel.font = [UIFont fontWithName:@"SourceSansPro-Regular" size:14];
	_titleLabel.textColor = [UIColor colorWithRed:0.2039 green:0.2118 blue:0.2392 alpha:1];


	_arrow = [[UIImageView alloc] initWithImage:[UIImage imageNamed:@"arrow"]];


	[self addSubview:_backgroundView];
	[self addSubview:_priceBarImageView];
	[self addSubview:_priceLabel];
	[self addSubview:_titleLabel];
	[self addSubview:_arrow];

    }
    return self;
}
- (void)layoutSubviews
{
    [super layoutSubviews];

	[_backgroundView setFrame:CGRectMake(0,1,320,50)];
	[_priceBarImageView setFrame:CGRectMake(60,23,173,9)];
	[_priceLabel setFrame:CGRectMake(244,19,28,17)];
	[_titleLabel setFrame:CGRectMake(9,18,44,34)];
	[_arrow setFrame:CGRectMake(self.bounds.size.width - 10 - 8,self.bounds.size.height/2.0 - 12/2.0,8,12)];

}
@end
